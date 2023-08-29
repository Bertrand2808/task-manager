# Cours Angular Éléctif

## Version

- node : v20.5.0
- npm : 9.8.0
- Angular CLI : 16.2.0
- Yarn : 1.22.19
- Compodoc 1.1.21

## Démarrer son application :

- `ng serve` : pour démarrer l'application
- `ng build` : pour build l'application en minifiant les fichiers c'est à dire en supprimant les espaces, les commentaires, etc...pour optimiser le code -> voir dans le index.html et le main dans le dossier dist que le ng build a créé

### Debugging

Yarn et Compodoc servent pour le debug :
Pour installer Yarn :

- `npm install -g yarn` : pour installer Yarn
  Pour installer Compodoc :
- `npm install -g @compodoc/compodoc` ou `yarn add @compodoc/compodoc` : pour installer Compodoc

Pour configurer compodoc :

- Créer un fichier tsconfig.doc.json et coller :

```json
{
  "include": ["src/**/*.ts"],
  "exclude": ["src/test.ts", "src/**/*.spec.ts", "src/app/file-to-exclude.ts"]
}
```

- Dans le package.json, ajouter un script :

```json
"scripts": {
  "compodoc": "npx compodoc -p tsconfig.doc.json"
}
```

## Composant :

### Pour créer un component :
- `ng g c nom-du-composant` ou `ng generate component nom-du-composant` : pour créer un composant

### Les directives structurelles:
- `*ngFor` : `ngFor` est une directive qui permet de faire des boucles pour itérer sur une liste par exemple.
- `*ngIf` : `ngIf` est une directive qui permet de faire des conditions pour afficher ou non un élément par exemple.

### Les pipes :
- `|` : le pipe permet de faire des transformations sur les données. Par exemple, on peut transformer une date en français avec le pipe `date` : `{{ date | date: 'dd/MM/yyyy' }}` ou `{{ date | date: 'dd/MM/yyyy HH:mm' }}` pour avoir la date et l'heure.

## Le router :
- `router-outlet` : le router-outlet est une directive qui permet d'afficher les composants en fonction de l'url. Par exemple, si on a un composant `home` et un composant `about`, on peut afficher le composant `home` avec l'url `localhost:4200/home` et le composant `about` avec l'url `localhost:4200/about`. Pour cela, il faut configurer le router dans le fichier `app-routing.module.ts` :

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirection de la route racine vers 'tasks'
  { path: 'tasks', component: TaskListComponent }, // Route pour le TaskListComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Créer une directive :

Pour créer une directive :
- `ng g d nom-de-la-directive` ou `ng generate directive nom-de-la-directive` : pour créer une directive
Ici, on va se servir de la directive pour changer les couleurs des boutons en fonction de l'état de la tâche (en cours, à faire ou terminée)
```typescript
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[etatColor]'
})
export class EtatColorDirective {
  @Input() set etatColor(etat: string | undefined) {
    const classMap: { [key: string]: string } = {
      'TERMINEE': 'bg-success',
      'EN_COURS': 'bg-primary',
      'A_FAIRE': 'bg-danger'
    };

    const cssClass = classMap[etat || ''];
    this.renderer.addClass(this.elementRef.nativeElement, cssClass);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
}
```

Et côté html :
```html
<button class="ms-2 py-0" mat-flat-button color="primary" [etatColor]="task.etat">
  {{ task.etat }}
</button>
```

## Les modules :

Pour créer un module :
- `ng g m nom-du-module` ou `ng generate module nom-du-module` : pour créer un module

## Les services :

Pour créer un service :
- `ng g s nom-du-service` ou `ng generate service nom-du-service` : pour créer un service

# 2eme cours
## Les Observables

### Mettre en place le module HttpClient

Pour mettre en place le module HttpClient, il faut l'importer dans le fichier `app.module.ts` :
```typescript
import { HttpClientModule } from '@angular/common/http';
```

Il faut créer un service pour faire les requêtes HTTP :
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})

export class HttpDataService {
  private baseUrl = 'http://domain/data';

  constructor(private http: HttpClient) { }
  [méthodes...]
}
```

Pour ensuite utiliser le service dans le composant :
```typescript
import { Task } from '../models/task';
import { HttpDataService } from '../services/http-data.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private httpDataService: HttpDataService) { }

  ngOnInit(): void {
    this.httpDataService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
```

Ici, on utilise la méthode `getTasks()` du service `HttpDataService` pour récupérer les tâches. On utilise la méthode `subscribe()` pour s'abonner à l'observable et récupérer les données.

Ensuite il faut souscrire à l'observable dans le service :
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})

export class HttpDataService {
  private baseUrl = 'http://domain/data';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }
}
```

Ici, on utilise la méthode `get()` du module HttpClient pour faire une requête HTTP de type GET. On lui passe en paramètre l'url de l'API et on lui précise le type de données que l'on veut récupérer.
