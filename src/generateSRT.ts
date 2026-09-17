import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
export default (
  start: { H: number; M: number; S: number },
  length: { H: number; M: number; S: number },
  BPM: number,
  sigTop: number,
  sigBottom: number
) => {
  const startTime = dayjs.duration(
    Math.round(
      dayjs.duration({ hours: start.H, minutes: start.M, seconds: start.S }).asMilliseconds()
    )
  );
  const lengthMil = Math.round(
    dayjs.duration({ hours: length.H, minutes: length.M, seconds: length.S }).asMilliseconds()
  );
  let text = `1\n00:00:00.000 --> ${startTime.format('HH:mm:ss,SSS')}\nbefore first beat\n\n`;
  let begin = startTime;
  for (let index = 0; index < ((lengthMil / 1000) * BPM) / 60; index++) {
    const end = dayjs.duration(
      Math.round(startTime.add(dayjs.duration(((index + 1) / BPM) * 60 * 1000)).asMilliseconds())
    );
    text += `${index + 2}\n${begin.format('HH:mm:ss,SSS')} --> ${end.format('HH:mm:ss,SSS')}\n${
      (index % sigTop) + 1
    }/${sigBottom}\nbar ${Math.floor(index / sigTop) + 1}\n\n`;
    begin = end;
  }
  return text;
};
