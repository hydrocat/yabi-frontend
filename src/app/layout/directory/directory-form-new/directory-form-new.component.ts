import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DirectoryService } from '../directory.service';
import { FormGroup } from '@angular/forms';
import { HateoasDirectory } from '../directory.model';
import { genericFormControl } from '../../../shared/modules/genericFormControl/genericFormControl';

@Component({
  selector: 'app-directory-form-new',
  templateUrl: './directory-form-new.component.html',
  styleUrls: ['./directory-form-new.component.scss']
})
export class DirectoryFormNewComponent implements OnInit {
  public form: FormGroup;
  public directory = new HateoasDirectory();
  public submission = new EventEmitter<HateoasDirectory>(true);
  public fields = Object.keys(this.directory).filter( k => k !== '_links');

  constructor(
    private directory$: DirectoryService,
  ) {}

  ngOnInit() {
    this.form = genericFormControl(new HateoasDirectory());
  }

  onSubmit() {
    Object.assign(this.directory, this.form.value);
    this.directory$.create(this.directory).subscribe( (d) => this.submission.emit(d) );
  }

}
