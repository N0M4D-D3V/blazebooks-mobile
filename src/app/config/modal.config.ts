import { DemiModalInitialization } from "demiurge";
import { BookDetailComponent } from "@components/modal/book-detail/book-detail.component";

export enum ModalEnum {
  Detail,
}

export const MODAL_CONFIG: DemiModalInitialization[] = [
  {
    component: BookDetailComponent,
    data: "",
    styles: {
      width: { vertical: "99%" },
      height: { vertical: "99%" },
    },
  },
];

export const getModalConfig = (modal: ModalEnum): DemiModalInitialization => {
  return MODAL_CONFIG[modal];
};
