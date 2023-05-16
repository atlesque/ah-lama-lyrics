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

const LyricsForm = () => {
  const [lyricsLines, setLyricsLines] = useAtom(lyricsLinesAtom);
  const [activeLyricsLine] = useAtom(selectedLyricsLineAtom);
  const [activeLyricsLineIndex, setActiveLyricsLineIndex] = useAtom(selectedLyricsLineIndexAtom);
  const [currentTime] = useAtom(currentTimeAtom);
  const [settings] = useAtom(settingsAtom);

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
    tibetan: string(),
    transliteration: string(),
    english: string(),
  });

  const methods = useForm<LyricsLine>({
    defaultValues: {
      startTime: 0,
      endTime: 0,
      tibetan: '',
      transliteration: '',
      english: '',
    },
    resolver: yupResolver(lyricsSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    reset: resetForm,
  } = methods;

  useEffect(() => {
    if (activeLyricsLine === undefined) {
      return resetForm();
    }
    setValue('startTime', activeLyricsLine.startTime);
    setValue('endTime', activeLyricsLine.endTime);
    setValue('tibetan', activeLyricsLine.tibetan);
    setValue('transliteration', activeLyricsLine.transliteration);
    setValue('english', activeLyricsLine.english);
  }, [activeLyricsLine, resetForm, setValue]);

  const onSaveLyrics = (updatedLine: LyricsLine): void => {
    const updatedLines = [...lyricsLines];
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
    } else {
      const prevLine = lyricsLines[activeLyricsLineIndex - 1];
      if (prevLine && prevLine.endTime === lyricsLines[activeLyricsLineIndex].startTime) {
        prevLine.endTime = updatedLine.startTime;
        updatedLines[activeLyricsLineIndex - 1] = prevLine;
      }
      updatedLines[activeLyricsLineIndex] = updatedLine;
      setLyricsLines(updatedLines);
    }
    setActiveLyricsLineIndex(undefined);
    resetForm();
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSaveLyrics)} className={styles.form}>
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
                className={styles.setTimeButton}
                onClick={() => handleSetTimeClick('startTime')}
              >
                Set
              </Button>
            </div>
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
                className={styles.setTimeButton}
                onClick={() => handleSetTimeClick('endTime')}
              >
                Set
              </Button>
            </div>
            {errors.endTime?.message && <Text color="error">{errors.endTime?.message}</Text>}
          </div>
        </fieldset>
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
        <Button type="submit" color="success">
          {activeLyricsLineIndex !== undefined ? 'Save' : 'Add new'}
        </Button>
        {activeLyricsLineIndex !== undefined && (
          <>
            <Button type="button" color="info" onClick={handleCancelClick}>
              Cancel
            </Button>
            <ConfirmButton type="button" color="error" onClick={handleDeleteClick}>
              Delete
            </ConfirmButton>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default LyricsForm;
