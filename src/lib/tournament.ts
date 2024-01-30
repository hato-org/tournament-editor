// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const focusTournament = <T>(optic: any, idArray: string[]): T => {
  return idArray.length
    ? focusTournament(
        optic.prop("match").at(Number(idArray[0])),
        idArray.slice(1)
      )
    : optic;
};
