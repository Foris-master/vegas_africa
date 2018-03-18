import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    // console.log(AC)
    let password = AC.get('mot_de_pass').value; // to get value in input tag
    let confirmPassword = AC.get('mot_de_pass_confirm').value; // to get value in input tag
    if(password != confirmPassword) {
       //console.log('false');
      AC.get('mot_de_pass_confirm').setErrors( {MatchPassword: true} )
    } else {
       //console.log('true');
      AC.get('mot_de_pass_confirm').setErrors( null )
      return null
    }
  }
}
