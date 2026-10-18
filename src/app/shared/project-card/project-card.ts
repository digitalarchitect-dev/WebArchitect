import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioProject } from '../../data/portfolio-projects';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  readonly project = input.required<PortfolioProject>();
}
