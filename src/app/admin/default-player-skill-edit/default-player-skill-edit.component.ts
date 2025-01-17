import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from '@app/configuration/configuration.service';
import { queueConfig } from '@app/queue/queue.selectors';
import { Store } from '@ngrx/store';
import { BehaviorSubject, zip } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ConfigurationEntryKey } from '@app/configuration/configuration-entry-key';
import { DefaultPlayerSkill } from '@app/configuration/models/default-player-skill';

@Component({
  selector: 'app-default-player-skill-edit',
  templateUrl: './default-player-skill-edit.component.html',
  styleUrls: ['./default-player-skill-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPlayerSkillEditComponent implements OnInit {
  isSaving = new BehaviorSubject<boolean>(false);

  form = this.formBuilder.group({
    gameClasses: this.formBuilder.group({}),
  });

  private queueConfig = this.store.select(queueConfig);

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private changeDetector: ChangeDetectorRef,
    private store: Store,
  ) {}

  ngOnInit() {
    zip(
      this.configurationService
        .fetchValue<DefaultPlayerSkill>(
          ConfigurationEntryKey.defaultPlayerSkill,
        )
        .pipe(map(s => s.value)),
      this.queueConfig.pipe(
        take(1),
        map(queueConfig => queueConfig.classes),
        map(classes => classes.map(cls => cls.name)),
      ),
    ).subscribe(([defaultSkill, gameClasses]) => {
      this.form.setControl(
        'gameClasses',
        this.formBuilder.group(
          gameClasses
            .map(gameClass => ({ gameClass, value: defaultSkill[gameClass] }))
            .reduce((acc, { gameClass, value }) => {
              acc[gameClass] = [value, Validators.required];
              return acc;
            }, {}),
        ),
      );
      this.changeDetector.markForCheck();
    });
  }

  save() {
    this.isSaving.next(true);
    this.configurationService
      .storeValue<DefaultPlayerSkill>({
        key: ConfigurationEntryKey.defaultPlayerSkill,
        value: this.gameClasses.value,
      })
      .pipe(
        map(entry => entry.value),
        tap(defaultPlayerSkill =>
          this.form.reset({ gameClasses: defaultPlayerSkill }),
        ),
      )
      .subscribe(() => {
        this.isSaving.next(false);
      });
  }

  get gameClasses(): FormGroup {
    return this.form.get('gameClasses') as FormGroup;
  }
}
