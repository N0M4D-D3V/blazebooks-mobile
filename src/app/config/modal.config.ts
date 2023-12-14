import { DemiModalInitialization } from 'demiurge';
import { CreateUserFormComponent } from '../components/modal/create-user-form/create-user-form.component';

export enum ModalEnum {
  NewUser,
}

export const MODAL_CONFIG: DemiModalInitialization<any>[] = [
  {
    component: CreateUserFormComponent,
    data: '',
    styles: {
      width: { vertical: '90%' },
      height: { vertical: '90%' },
    },
  },
];

export const getModalConfig = (
  modal: ModalEnum
): DemiModalInitialization<any> => {
  return MODAL_CONFIG[modal];
};
