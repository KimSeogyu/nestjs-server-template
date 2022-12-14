export interface IServerResponse {
  meta: {
    timestamp: string;
    isError: boolean;
  };
  input: any;
  output: any;
  error?: string | object;
}
