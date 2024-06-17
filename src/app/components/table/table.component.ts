import {
  Component,
  EventEmitter,
  Input,
  Output,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

import { IPLService } from '../../ipl.service';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import { Match } from '../../match.data';

@Component({
  selector: 'app-table',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  data: Match[] = [];
  error: boolean = false;
  loading: boolean = false;
  submitted: boolean = false;
  winPercentage: number = 0;
  lossPercentage: number = 0;

  @Input() team: string = '';
  @Input() season: string = '';
  @Output() dataFetched = new EventEmitter<{
    winPercentage: number;
    lossPercentage: number;
  }>();

  @Output() Loaded = new EventEmitter<{ show: boolean }>();

  constructor(private iplService: IPLService) {}

  headerRows: string[] = [
    'Season',
    'Team 1',
    'Team 2',
    'Date',
    'Target',
    'Match Type',
    'Winner',
    'Result',
    'Result Margin',
    'Player of the Match',
  ];

  onFormSubmit(eventData: { team: string; season: string }): void {
    this.team = eventData.team;
    this.season = eventData.season;
    this.submitted = true;
    this.loading = true;
    this.error = false;
    this.Loaded.emit({ show: this.loading });

    this.iplService
      .getMatchesBySeasonAndTeam(eventData.team, eventData.season)
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.data = data;

          console.log(this.data);

          //calculate wins and losses
          const totalGames = data.length;
          const wins = data.filter(
            (match) => match.winner === this.team
          ).length;
          const losses = totalGames - wins;

          // calculate percentages
          this.winPercentage = (wins / totalGames) * 100;
          this.lossPercentage = (losses / totalGames) * 100;

          this.dataFetched.emit({
            winPercentage: this.winPercentage,
            lossPercentage: this.lossPercentage,
          });
        },
      });
  }
}
