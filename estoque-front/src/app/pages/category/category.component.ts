import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';
import { Category } from '../../shared/models/category';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-category',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private snackbarService: SnackbarService,
    private utilsService: UtilsService
  ) {}

  categories: Category[] = [];
  filteredCategories: Category[] = [];

  dialog = inject(MatDialog);

  form!: FormGroup;

  ngOnInit() {
    this.getCategories();
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
    });

    this.form.get('name')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredCategories = this.categories.filter((category) =>
          category.name.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
  }

  getCategories(): void {
    this.categoryService.list().subscribe((categories) => {
      this.categories = categories;
      this.filteredCategories = this.categories;
    });
  }

  clearSearch(): void {
    this.form.get('name')?.reset();
    this.filteredCategories = this.categories;
  }

  async insertDialog() {
    const category = await this.utilsService.openDialog({
      component: CategoryDetailComponent,
      data: {
        action: 'Cadastrar',
      },
    });

    if (category) {
      const categoryAlreadyExists = this.categories.filter(
        (c) => c.name.toLowerCase() === category.name.toLowerCase()
      );
      if (categoryAlreadyExists.length > 0) {
        this.utilsService.onError('Já existe uma categoria cadastrada com esse nome.');
        return;
      }

      this.insert(category);
    }
  }

  async editDialog(category: Category) {
    const result = await this.utilsService.openDialog({
      component: CategoryDetailComponent,
      data: {
        action: 'Editar',
        category,
      },
    });

    if (result && result.removeId && typeof result.removeId == 'number') {
      this.remove(result.removeId);
    }

    if (result && result.name) {
      this.edit(category.id, result);
    }
  }

  private insert(category: Category) {
    this.categoryService.create(category).subscribe({
      next: (category) => {
        this.snackbarService.open('Categoria cadastrada com sucesso!');
        this.getCategories();
      },
      error: (err) => {
        this.utilsService.onError(err.error.message || 'Erro ao inserir categoria');
      },
    });
  }

  private edit(id: number, category: Category) {
    this.categoryService.edit(id, category).subscribe({
      next: () => {
        this.snackbarService.open('Categoria atualizada com sucesso!');
        this.getCategories();
      },
      error: (err) => {
        this.utilsService.onError(err.error.message || 'Erro ao atualizar categoria');
      },
    });
  }

  private remove(id: number) {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.snackbarService.open('Categoria deletada com sucesso!');
        this.getCategories();
      },
      error: (err) => {
        this.utilsService.onError(err.error.message || 'Erro ao deletar categoria');
      },
    });
  }
}
