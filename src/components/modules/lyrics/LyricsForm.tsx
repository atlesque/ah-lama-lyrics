import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ObjectSchema, number, object, string } from 'yup';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { currentTimeAtom } from '../../../atoms/audioPlayer';
import {
  selectedLyricsLineAtom,
  selectedLyricsLineIndexAtom,
  lyricsLinesAtom,
} from '../../../atoms/lyrics';
import { LyricsLine } from '../../../types/lyrics';
import Button from '../../shared/Button';
import ConfirmButton from '../../shared/ConfirmButton';
import Input from '../../shared/Input';
import Text from '../../shared/Text';
import styles from './LyricsForm.module.scss';
import { settingsAtom } from '../../../atoms/settings';
import { getSecondsAsTimecode } from '../../../helpers/getSecondsAsTimecode';
import TextArea from '../../shared/TextArea';

interface OnSaveLyricsProps {
  line: LyricsLine;
  editNextAfterSave?: boolean;
}

const LyricsForm = () => {
  const [lyricsLines, setLyricsLines] = useAtom(lyricsLinesAtom);
  const [activeLyricsLine] = useAtom(selectedLyricsLineAtom);
  const [activeLyricsLineIndex, setActiveLyricsLineIndex] = useAtom(selectedLyricsLineIndexAtom);
  const [currentTime] = useAtom(currentTimeAtom);
  const [settings] = useAtom(settingsAtom);

  const isEditingExistingLine = activeLyricsLineIndex !== undefined;

  const lyricsSchema: ObjectSchema<LyricsLine> = object({
    startTime: number()
      .required()
      .min(0)
      .test(
        'lessThanEndTime',
        'Start must be before end',
        (item, ctx) => item < ctx.parent.endTime
      ),
    endTime: number()
      .required()
      .min(0)
      .test(
        'moreThanStartTime',
        'End must be after start',
        (item, ctx) => item > ctx.parent.startTime
      ),
    mixed: string(),
    tibetan: string(),
    transliteration: string(),
    english: string(),
    image: string(),
  });

  const methods = useForm<LyricsLine>({
    defaultValues: {
      startTime: 0,
      endTime: 0,
      mixed: '',
      tibetan: '',
      transliteration: '',
      english: '',
      image: '',
    },
    resolver: yupResolver(lyricsSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
    reset: resetForm,
  } = methods;

  const watchStartTime = watch('startTime');
  const watchEndTime = watch('endTime');

  useEffect(() => {
    if (activeLyricsLine === undefined) {
      return resetForm();
    }
    setValue('startTime', activeLyricsLine.startTime);
    setValue('endTime', activeLyricsLine.endTime);
    setValue('mixed', activeLyricsLine.mixed);
    setValue('tibetan', activeLyricsLine.tibetan);
    setValue('transliteration', activeLyricsLine.transliteration);
    setValue('english', activeLyricsLine.english);
    setValue('image', activeLyricsLine.image);
  }, [activeLyricsLine, resetForm, setValue]);

  const parseMixedInputLine = (inputLine: LyricsLine): LyricsLine => {
    if (inputLine?.mixed === undefined) {
      return inputLine;
    }
    const mixedInputLine = inputLine.mixed;
    const mixedInputLineParts = mixedInputLine.split('\n');
    const tibetan = mixedInputLineParts[0]?.trim();
    const transliteration = mixedInputLineParts[1]?.trim();
    const english = mixedInputLineParts[2]?.trim();
    return {
      ...inputLine,
      tibetan,
      transliteration,
      english,
    };
  };

  const onSaveLyrics = ({ line, editNextAfterSave = false }: OnSaveLyricsProps): void => {
    resetForm();
    const updatedLines = [...lyricsLines];
    const updatedLine = parseMixedInputLine(line);
    if (activeLyricsLineIndex === undefined) {
      const newLine = { ...updatedLine };
      if (newLine.startTime <= 0) {
        newLine.startTime = currentTime;
      }
      const prevLine = updatedLines.pop();
      if (prevLine && prevLine.endTime === 0) {
        prevLine.endTime = newLine.startTime;
      }
      setLyricsLines([...updatedLines, ...(prevLine ? [prevLine] : []), newLine]);
      setValue('startTime', newLine.endTime);
    } else {
      const prevLine = lyricsLines[activeLyricsLineIndex - 1];
      if (prevLine && prevLine.endTime === lyricsLines[activeLyricsLineIndex].startTime) {
        prevLine.endTime = updatedLine.startTime;
        updatedLines[activeLyricsLineIndex - 1] = prevLine;
      }
      updatedLines[activeLyricsLineIndex] = updatedLine;
      setLyricsLines(updatedLines);
    }
    setActiveLyricsLineIndex(
      editNextAfterSave &&
        activeLyricsLineIndex !== undefined &&
        activeLyricsLineIndex + 1 < updatedLines.length
        ? activeLyricsLineIndex + 1
        : undefined
    );
  };

  const handleCancelClick = (): void => {
    setActiveLyricsLineIndex(undefined);
    resetForm();
  };

  const handleDeleteClick = (): void => {
    if (activeLyricsLineIndex === undefined) {
      return;
    }
    const updatedLines = [...lyricsLines];
    updatedLines.splice(activeLyricsLineIndex, 1);
    setLyricsLines(updatedLines);
    setActiveLyricsLineIndex(undefined);
    resetForm();
  };

  const handleSetTimeClick = (timeType: 'startTime' | 'endTime'): void => {
    setValue(timeType, currentTime);
  };

  const handleSaveAndNextClick = (): void => {
    handleSubmit(line => onSaveLyrics({ line, editNextAfterSave: true }))();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(line => onSaveLyrics({ line }))} className={styles.form}>
        <fieldset className={styles.inputGroup}>
          <div>
            <div className={styles.timeInputGroup}>
              <Input
                {...register('startTime')}
                type="number"
                step={0.01}
                min={0}
                placeholder="Start"
                autoComplete="off"
              />
              <Button
                type="button"
                variant="contained"
                className={styles.setTimeButton}
                onClick={() => handleSetTimeClick('startTime')}
              >
                Set
              </Button>
            </div>
            <small>{getSecondsAsTimecode(watchStartTime)}</small>
            {errors.startTime?.message && <Text color="error">{errors.startTime?.message}</Text>}
          </div>
          <div>
            <div className={styles.timeInputGroup}>
              <Input
                {...register('endTime')}
                type="number"
                step={0.01}
                min={0}
                placeholder="End"
                autoComplete="off"
              />
              <Button
                type="button"
                variant="contained"
                className={styles.setTimeButton}
                onClick={() => handleSetTimeClick('endTime')}
              >
                Set
              </Button>
            </div>
            {errors.endTime?.message && <Text color="error">{errors.endTime?.message}</Text>}
            <small>{getSecondsAsTimecode(watchEndTime)}</small>
          </div>
        </fieldset>
        {settings.showMixedInput && (
          <TextArea
            {...register('mixed')}
            placeholder="Mixed"
            error={errors.mixed?.message}
            autoComplete="off"
            rows={3}
          />
        )}
        {settings.showTibetan && (
          <Input
            {...register('tibetan')}
            placeholder="Tibetan"
            error={errors.tibetan?.message}
            autoComplete="off"
          />
        )}
        <Input
          {...register('transliteration')}
          placeholder="Transliteration"
          error={errors.transliteration?.message}
          autoComplete="off"
        />
        <Input
          {...register('english')}
          placeholder="English"
          error={errors.english?.message}
          autoComplete="off"
        />
        {settings.showImageInput && (
          <Input
            {...register('image')}
            placeholder="Image"
            error={errors.image?.message}
            autoComplete="off"
          />
        )}
        <div className={styles.saveButtonGroup}>
          <Button type="submit" color="success" variant="contained">
            {isEditingExistingLine ? 'Save & close' : 'Add new'}
          </Button>
          {isEditingExistingLine && (
            <Button
              type="button"
              color="success"
              variant="contained"
              onClick={handleSaveAndNextClick}
            >
              Save & next
            </Button>
          )}
        </div>
        {isEditingExistingLine && (
          <>
            <Button type="button" color="info" variant="contained" onClick={handleCancelClick}>
              Cancel
            </Button>
            <ConfirmButton
              type="button"
              color="error"
              variant="contained"
              onClick={handleDeleteClick}
            >
              Delete
            </ConfirmButton>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default LyricsForm;
