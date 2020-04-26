import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})


export class FormsComponent implements OnInit {
  
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form=this.fb.group({
      heading: ['',Validators.required],
      lastdate:[''],
      department:['',Validators.required],
      file: ['', Validators.required],
      fileSource:['',Validators.required],
      section: this.fb.array([]) ,
      year: this.fb.array([]) 
    })
  }

  get sections() : FormArray {
    return this.form.get("section") as FormArray
  }

  get years() : FormArray {
    return this.form.get("year") as FormArray
  }

  newSection(): FormGroup {
    return this.fb.group({
      section: [],
    })
  }

 newYear(): FormGroup {
  return this.fb.group({
    year: [],
  })
  }

  addSections() {
  this.sections.push(this.newSection());
  }

  addYears() {
  this.years.push(this.newYear());
  }

  removeSection(i:number) {
    this.sections.removeAt(i);
  }

  removeYears(i:number) {
    this.years.removeAt(i);
  }

  ngOnInit() { }


  onFileChange(event) {
  
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.form.patchValue({
      fileSource: file
    });
  }
  }

  submitForm() {
  var formData: any = new FormData();
  formData.append("heading", this.form.get('heading').value);
  formData.append("lastdate", this.form.get('lastdate').value);
  formData.append("department", this.form.get('department').value);
  formData.append('notice', this.form.get('fileSource').value);
  formData.append("section",this.form.get('section').value);
  formData.append("year",this.form.get('year').value);
  this.http.post('https://e-notice-board.herokuapp.com/faculty/notice/create', formData).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  )
}}
