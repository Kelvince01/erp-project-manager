import { createFeatureSelector } from '@ngrx/store';
import { Appstate } from '@stores/appstate';

export const selectAppState = createFeatureSelector<Appstate>('appState');
