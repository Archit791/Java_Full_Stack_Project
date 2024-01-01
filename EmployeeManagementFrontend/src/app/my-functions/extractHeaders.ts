export function extractHeaders(getAllApiReponse: any): string[] {
  if (getAllApiReponse.length > 0) {
    var keysArray: any[] = Object.keys(getAllApiReponse[0]);
    keysArray.push('operations');
    return keysArray;
  }
  return [];
}
