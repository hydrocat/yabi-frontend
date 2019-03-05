import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { QueryService } from '../../query.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Query } from '../../query.model';
import { genericFormControl } from '../../../../shared/modules/genericFormControl/genericFormControl';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.scss']
})
export class QueryFormComponent implements OnInit {
  public form: FormGroup;
  public title: 'New Query' | 'Edit Query';
  public isEdit: boolean;

  constructor(
    private query$: QueryService,
    @Inject(MAT_DIALOG_DATA) public query: Query | null
  ) {}

  ngOnInit() {
    if (!this.query) {
      this.isEdit = false;
      this.title = 'New Query';
      this.query = new Query();
    } else {
      this.isEdit = true;
      this.title = 'Edit Query';
    }

    this.form = genericFormControl(this.query, ['id']);
  }

  onSubmit() {
    if (this.isEdit) {
      throw new Error('Edit not implemented yet');
    } else {
      this.query$.create(this.query);
    }
  }
}
