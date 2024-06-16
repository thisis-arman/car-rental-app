export type TErrorOrigin = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorOrigin: TErrorOrigin;
};
