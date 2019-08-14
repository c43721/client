import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap, takeUntil } from 'rxjs/operators';
import { PlayerBan } from '../models/player-ban';
import { Observable, Subject } from 'rxjs';
import { Player } from '../models/player';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { playerById, playerBans } from '../selectors';
import { loadPlayer, revokePlayerBan, loadPlayerBans } from '../actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-bans',
  templateUrl: './player-bans.component.html',
  styleUrls: ['./player-bans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBansComponent implements OnInit, OnDestroy {

  private destroyed = new Subject<void>();
  player: Observable<Player>;
  bans: Observable<PlayerBan[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
  ) { }

  ngOnInit() {
    const getPlayerId = this.route.paramMap.pipe(
      map(params => params.get('id')),
    );

    this.player = getPlayerId.pipe(
      switchMap(playerId => this.store.select(playerById(playerId)).pipe(
        tap(player => {
          if (!player) {
            this.store.dispatch(loadPlayer({ playerId }));
          }
        })
      ))
    );

    getPlayerId.pipe(
      takeUntil(this.destroyed),
    ).subscribe(playerId => this.store.dispatch(loadPlayerBans({ playerId })));

    this.bans = getPlayerId.pipe(switchMap(playerId => this.store.select(playerBans(playerId))));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.unsubscribe();
  }

  revoke(playerBan: PlayerBan) {
    this.store.dispatch(revokePlayerBan({ playerBan }));
  }

  back() {
    this.location.back();
  }

}