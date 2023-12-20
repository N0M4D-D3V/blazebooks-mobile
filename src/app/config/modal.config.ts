import { DemiModalInitialization } from 'demiurge';
import { CreateUserFormComponent } from '@components/modal/create-user-form/create-user-form.component';
import { BookDetailComponent } from '@components/modal/book-detail/book-detail.component';

export enum ModalEnum {
  NewUser,
  Detail,
}

export const MODAL_CONFIG: DemiModalInitialization[] = [
  {
    component: CreateUserFormComponent,
    data: '',
    styles: {
      width: { vertical: '90%' },
      height: { vertical: '90%' },
    },
  },
  {
    component: BookDetailComponent,
    data: '',
    styles: {
      width: { vertical: '90%' },
      height: { vertical: '90%' },
    },
  },
];

export const getModalConfig = (modal: ModalEnum): DemiModalInitialization => {
  return MODAL_CONFIG[modal];
};
