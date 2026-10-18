import { Component } from '@angular/core';
import { PORTFOLIO_PROJECTS } from '../../data/portfolio-projects';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PORTFOLIO_PROJECTS;
}
