import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { State } from './queue.reducer';

const queueFeature = createFeatureSelector<AppState, State>('queue');

export const queueConfig = createSelector(queueFeature, feature => feature.config);
export const queueClasses = createSelector(queueConfig, qc => qc && qc.classes);
export const queueState = createSelector(queueFeature, feature => feature.state);

export const queueRequiredPlayerCount = createSelector(
  queueClasses,
  queueConfig,
  (classes, config) => classes && classes.reduce((prev, curr) => prev + curr.count, 0) * config.teamCount
);

export const queueSlots = createSelector(queueFeature, feature => feature.slots);
export const queueCurrentPlayerCount = createSelector(
  queueSlots,
  slots => slots && slots.reduce((prev, curr) => curr.playerId ? prev + 1 : prev, 0));

export const queueSlotsForClass = (gameClass: string) => createSelector(
  queueSlots,
  slots => slots && slots.filter(s => s.gameClass === gameClass),
);
