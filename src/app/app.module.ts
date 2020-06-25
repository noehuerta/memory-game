import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './memory-game/card/card.component'
import { MemoryGameComponent } from './memory-game/memory-game.component'

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MemoryGameComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
