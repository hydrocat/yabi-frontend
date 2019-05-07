import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DirectoryService } from '../directory.service';
import { FormGroup } from '@angular/forms';
import { HateoasDirectory } from '../directory.model';
import { genericFormControl } from '../../../shared/modules/genericFormControl/genericFormControl';

@Component({
  selector: 'app-directory-form-edit',
  templateUrl: './directory-form-edit.component.html',
  styleUrls: ['./directory-form-edit.component.scss']
})
export class DirectoryFormEditComponent implements OnInit {
  public form: FormGroup;
  public submission = new EventEmitter<HateoasDirectory>(true);

  constructor(
    private directory$: DirectoryService,
    @Inject(MAT_DIALOG_DATA)
    public directory: HateoasDirectory
  ) {}

  ngOnInit() {
    this.form = genericFormControl(this.directory, ['_links']);
  }

  onSubmit() {
    const newValues = Object.keys(this.form.controls).reduce( (acc, key) => {
      if ( this.form.value[key] !== this.directory[key]) {
        acc[key] = this.form.value[key];
      }
      return acc;
    }, {});
    console.log(newValues);
    this.directory$.patch(
      <HateoasDirectory>{uri: this.directory.uri, ...newValues}
      ).subscribe( (d) => this.submission.emit(d) );
  }

}
