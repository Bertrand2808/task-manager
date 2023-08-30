# Historique des cmd
## Installation des bases :
351  node -v
  352  npm -vc
  353  npm -v
  354  npm install -g @angular/cli
  355  ng new task-manager
  356  history

## Installation de Yarn et Compodoc
349  cd task-manager/
  350  ng add @angular/material
  351  npm i --global yarn
  352  yarn add --dev @compodoc/compodoc
  353  yarn v
  354  compodoc --version
  355  compodoc --version
  356  yarn add --dev @compodoc/compodoc
  357  npm run compodoc

## Création des components
  363  ng generate component task
  364  ng generate component main-task
  365  ng generate component task-list
  366  ng add @ng-bootstrap/ng-bootstrap
  367  npm i @angular/router
  368  ng generate component nav-bar

## Création du routeur & du module
  370  ng g module tasks
  371  ng g c date
  372  ng g directive etat-color
  373  ng g service crud-task-list

## Création des services et des interfaces
  378 ng g service crud-task-list
  379 ng g service by-status-task-list
  380 ng g interface crud-task-list
  381 ng g interface by-status-task-list
  382 ng g s task-facade

## Création du reactive form
  387 ng g module AddTaskForm
  388 ng g c add-task-form
  389 ng g c main-add-task-form
  390 ng g c error-minLenght-field-form
  391 ng g c error-maxLenght-field-form
  392 ng g c error-required-field-form
  396 ng g module DeleteTaskForm
  397 ng g c delete-task-form
  398 ng g c main-delete-task-form

## Création du module Shared
  367  ng g module shared

