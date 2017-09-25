import b64 from 'base-64';

export const getClaimFromToken = (token, claim) => {
  var payload = token.split('.')[1];
  const jsonStr  = b64.decode(payload);
  var obj = JSON.parse(jsonStr);
  return obj[claim];
}
