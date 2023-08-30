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

#### Le model :
- `ng g class models/nom-du-model` ou `ng generate class models/nom-du-model` : pour créer un model

Le but d'un model est de définir la structure d'un objet. Par exemple, pour une tâche, on va définir la structure de la tâche avec un model.

### Les directives structurelles:
- `*ngFor` : `ngFor` est une directive qui permet de faire des boucles pour itérer sur une liste par exemple.
- `*ngIf` : `ngIf` est une directive qui permet de faire des conditions pour afficher ou non un élément par exemple.

### Les pipes :
- `|` : le pipe permet de faire des transformations sur les données. Par exemple, on peut transformer une date en français avec le pipe `date` : `{{ date | date: 'dd/MM/yyyy' }}` ou `{{ date | date: 'dd/MM/yyyy HH:mm' }}` pour avoir la date et l'heure.

#### Les pipes personnalisés :

Ici on va créer un nouveau composant pour créer un pipe personnalisé :
- `ng g c pipes/nom-du-pipe` ou `ng generate component pipes/nom-du-pipe` : pour créer un composant

Dans le fichier `nom-du-pipe.component.ts`, on va créer un pipe personnalisé :
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date, format: string = 'dd/MM/yyyy'): string {
    const day = value.getDate().toString().padStart(2, '0');
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const year = value.getFullYear().toString();
    return format.replace('dd', day).replace('MM', month).replace('yyyy', year);
  }
}
```

Ce pipe va permettre de transformer une date en français. On va utiliser la méthode `transform()` pour transformer la date. On va utiliser la méthode `padStart()` pour ajouter un 0 devant le jour et le mois si le jour ou le mois est inférieur à 10. On va utiliser la méthode `replace()` pour remplacer les valeurs dans le format de la date.

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
### Le Lazy Loading :

Le Lazy Loading permet de charger les modules à la demande. Par exemple, si on a un module `home` et un module `about`, on peut charger le module `home` avec l'url `localhost:4200/home` et le module `about` avec l'url `localhost:4200/about`. Pour cela, il faut configurer le router dans le fichier `app-routing.module.ts` :

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirection de la route racine vers 'tasks'
  { path: 'tasks', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) }, // Route pour le TaskListComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

Ici, on utilise la méthode `loadChildren` pour charger le module `task` à la demande. On utilise la méthode `import()` pour importer le module `task` et la méthode `then()` pour charger le module `task` à la demande.

Concrètement, le lazy loading permet de charger les modules à la demande et donc d'optimiser le chargement de l'application sans charger tous les modules en même temps.
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

Les modules servent à organiser le code de l'application. On peut créer un module par fonctionnalité par exemple `add-task`, `delete-task`, `task-list`, etc...
## Les services :

Pour créer un service :
- `ng g s nom-du-service` ou `ng generate service nom-du-service` : pour créer un service

Un service sert à faire des traitements. Par exemple, pour faire des requêtes HTTP, on va créer un service pour faire les requêtes HTTP. Ici par exemple on va créer un service CRUDTaskList qui va nous permettre de centraliser les actions de l'application (ajouter une tâche, supprimer une tâche, etc...) et que l'on va pouvoir réutiliser dans les composants.

## Les interfaces :

Pour créer une interface :
- `ng g i nom-de-l-interface` ou `ng generate interface nom-de-l-interface` : pour créer une interface

Une interface sert à définir la structure d'un objet. Par exemple, pour une tâche, on va définir la structure de la tâche avec une interface.

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

## Les React Forms

Pour créer un formulaire réactif, d'abord créer un module à part :
- `ng g m nom-du-module` ou `ng generate module nom-du-module` : pour créer un module

Ensuite, créer un composant pour le formulaire :

- `ng g c nom-du-composant` ou `ng generate component nom-du-composant` : pour créer un composant

Dans le fichier `nom-du-composant.component.html`, créer le formulaire :
```html
<form [formGroup]="taskForm" (ngSubmit)="onSubmit($event)"
  style="display: grid;align-items: center;justify-content: center;">
  <h1 class="text-center m-5" style="font-size: x-large;font: bold;">Ajouter une tâche !</h1>
  <div class="form-group">
    <label class="m-2">
      Titre :
      <input type="text" formControlName="titre" class="form-control" />
      <div
        *ngIf="taskForm.controls['titre'].invalid && (taskForm.controls['titre'].dirty || taskForm.controls['titre'].touched)"
        class="text-center" style="align-items: center;justify-content: center;">
        <div *ngIf="taskForm.controls['titre'].errors?.['required']" class="alert alert-danger">
          <app-error-required-field-form [showError]="taskForm.controls['titre'].errors?.['required']"
            fieldName="Titre"></app-error-required-field-form>
        </div>
        <div *ngIf="taskForm.controls['titre'].errors?.['minlength']" class="alert alert-danger">
          <app-error-minLength-field-form [showError]="taskForm.controls['titre'].errors?.['minlength']"
            fieldName="Titre"></app-error-minLength-field-form>
        </div>
        <div *ngIf="taskForm.controls['titre'].errors?.['maxlength']" class="alert alert-danger">
          <app-error-maxLength-field-form [showError]="taskForm.controls['titre'].errors?.['maxlength']"
            fieldName="Titre"></app-error-maxLength-field-form>
        </div>
      </div>
    </label>
    <label class="m-2">
      Description :
      <input type="text" formControlName="description" class="form-control" />
      <div
        *ngIf="taskForm.controls['description'].invalid && (taskForm.controls['description'].dirty || taskForm.controls['description'].touched)"
        class="text-center" style="align-items: center;justify-content: center;">
        <div
          *ngIf="taskForm.controls['description'].invalid && (taskForm.controls['description'].dirty || taskForm.controls['description'].touched)">
          <div *ngIf="taskForm.controls['description'].errors?.['required']" class="alert alert-danger">
            <app-error-required-field-form [showError]="taskForm.controls['description'].errors?.['required']"
              fieldName="Description"></app-error-required-field-form>
          </div>
          <div *ngIf="taskForm.controls['description'].errors?.['minlength']" class="alert alert-danger">
            <app-error-minLength-field-form [showError]="taskForm.controls['titre'].errors?.['minlength']"
              fieldName="Description"></app-error-minLength-field-form>
          </div>
          <div *ngIf="taskForm.controls['description'].errors?.['maxlength']" class="alert alert-danger">
            <app-error-maxLength-field-form [showError]="taskForm.controls['titre'].errors?.['maxlength']"
              fieldName="Description"></app-error-maxLength-field-form>
          </div>
        </div>
      </div>
    </label>
  </div>
  <button type="submit" class="btn btn-primary m-3">Ajouter Tâche</button>
</form>
```

Dans ce template on peut voir que l'on utilise les directives `formGroup` et `formControlName` pour lier le formulaire au composant :
- `formGroup` : permet de lier le formulaire au composant
- `formControlName` : permet de lier les champs du formulaire au composant

On retrouve également les Validators pour valider les champs du formulaire :
- `Validators.required` : permet de vérifier si le champ est vide
- `Validators.minLength` : permet de vérifier si le champ a une longueur minimum
- `Validators.maxLength` : permet de vérifier si le champ a une longueur maximum

Dans l'idée ici on a créé des composants séparés pour les erreurs de validation :
- `app-error-required-field-form` : pour les champs requis
- `app-error-minLength-field-form` : pour les champs avec une longueur minimum
- `app-error-maxLength-field-form` : pour les champs avec une longueur maximum

On va appelé ces composants dans le template du formulaire dans les balises `div` avec les directives `*ngIf` pour afficher les erreurs de validation.

## Le partage des composants

Pour partager un composant, il faut le créer dans le dossier `shared`, pour cela on peut créer un module `shared` :
- `ng g m shared` ou `ng generate module shared` : pour créer un module

Ensuite, il suffit de transférer les composants dans le dossier `shared` et de les importer dans le module `shared` :
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMaxLengthFieldFormComponent } from './error-max-length-field-form/error-maxLength-field-form.component';
import { ErrorMinLengthFieldFormComponent } from './error-min-length-field-form/error-minLength-field-form.component';
import { ErrorRequiredFieldFormComponent } from './error-required-field-form/error-required-field-form.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorMaxLengthFieldFormComponent,
    ErrorMinLengthFieldFormComponent,
    ErrorRequiredFieldFormComponent,
  ],
  exports: [
    ErrorMaxLengthFieldFormComponent,
    ErrorMinLengthFieldFormComponent,
    ErrorRequiredFieldFormComponent,
  ],
})
export class SharedModule { }
```

Ensuite, il faut importer le module `shared` dans les modules où l'on veut utiliser les composants :
```typescript
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  exports: [],
})
```
### Question Shared module  :

On peut constater qu'un module "Shared" peut avoir ses limites (gros volumes de composant à partager). Quelles solutions voyez-vous pour pallier à ça ?

- Diviser en sous module :
  - En faisant cela on peut créer un module par type de composant (ex: un module pour les composants de formulaire, un module pour les composants de liste, etc...)
  - On peut aussi créer un module par fonctionnalité (ex: un module pour les composants de la page d'accueil, un module pour les composants de la page de connexion, etc...)
  - Le Lazy Loading qui permet de charger les modules à la demande, pourrait aussi être une solution pour éviter de charger tous les modules en même temps.

## Les tests unitaires

Le but des tests unitaires est de tester les fonctionnalités de l'application. Pour cela, on va tester les méthodes des composants, des services, etc...
Cela va se situer dans le fichier `spec.ts`.
exemple pour le service crud :
**voir le fichier spec associé**

Les fonctions principales des tests :
- `describe()` : permet de décrire le test
- `beforeEach()` : permet de faire des actions avant chaque test
- `it()` : permet de décrire le test
- `expect()` : permet de faire des assertions
- `spyOn()` : permet de faire des espions sur les méthodes

ensuite pour lancer le test :
- `ng test` : pour lancer les tests unitaires

Cela va ouvrir un navigateur avec les tests unitaires et afficher les tests qui ont réussi et ceux qui ont échoué.

D'après le code coverage, mes pourcentages de couverture de test sont de :
- Statements : 93.02%
- Branches : 72.72%
- Functions : 87.71%
- Lines : 92.56%
