import {OpaqueToken} from "@angular/core";
export const Toaster = new OpaqueToken("Toaster");

export function toasterServiceFactory(i: any) {
  return i.get('toaster');
}
export const toasterServiceProvider = {
  provide: Toaster,
  useFactory: toasterServiceFactory,
  deps: ['$injector']
};