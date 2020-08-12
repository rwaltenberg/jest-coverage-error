/**
 * Intercom widget control mixin
 */
export interface IIntercomMixin {
  /**
   * Whether the widget is visible or not.
   **/
  visible: boolean;
  /**
   * Initialises the Intercom widgets with the provided parameters.
   **/
  boot: (arg: object) => void;
  /**
   * Widget show method.
   **/
  show: () => void;
  /**
   * Widget show method.
   **/
  showNewMessage: (message: string) => void;
  /**
   * Widget shutdown method.
   **/
  shutdown: () => void;
}
