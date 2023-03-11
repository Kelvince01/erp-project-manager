import { Directive, Input } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { CustomvalidationService } from '@shared/services/customvalidation.service';

@Directive({
  selector: '[appMatchPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') MatchPassword: string[] = [];

  constructor(private customValidator: CustomvalidationService) {}

  validate(formGroup: FormGroup): ValidationErrors {
    return this.customValidator.MatchPassword(
      this.MatchPassword[0],
      this.MatchPassword[1]
    )(formGroup) as any;
  }
}
