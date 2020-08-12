export interface IPubNubResponse {
  channel: string;
  actualChannel: string | null;
  subscribedChannel: string;
  timetoken: string;
  publisher: string;
  message: IPubNubMessage;
}

export interface IPubNubMessage {
  type: string;
  data: any;
  [key: string]: any;
}

/**
 * Pubnub widget control mixin
 */
export interface IPubnubMixin {
  /**
   * Pubnub subscribe method
   */
  $pnSubscribe: (arg: object) => void;
  /**
   * Pubnub getMessage method
   */
  $pnGetMessage: (arg: string) => string;
}
