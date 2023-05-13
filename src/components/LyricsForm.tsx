import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ObjectSchema, object, string } from 'yup';
import Button from './shared/Button';
import Input from './shared/Input';

import { LyricsLine } from '../types/lyrics';
import styles from './LyricsForm.module.scss';
import { useAtom } from 'jotai';
import { activeLyricsLineAtom, activeLyricsLineIndexAtom, lyricsLinesAtom } from '../atoms/lyrics';
import { useEffect } from 'react';
import ConfirmButton from './shared/ConfirmButton';

interface LyricsFormProps {
  showTibetan?: boolean;
}

const LyricsForm = ({ showTibetan = false }: LyricsFormProps) => {
  const [lyricsLines, setLyricsLines] = useAtom(lyricsLinesAtom);
  const [activeLyricsLine] = useAtom(activeLyricsLineAtom);
  const [activeLyricsLineIndex, setActiveLyricsLineIndex] = useAtom(activeLyricsLineIndexAtom);

  const lyricsSchema: ObjectSchema<LyricsLine> = object({
    tibetan: string(),
    transliteration: string().required(),
    english: string().required(),
  });

  const methods = useForm<LyricsLine>({
    defaultValues: {
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
      return;
    }
    setValue('tibetan', activeLyricsLine.tibetan);
    setValue('transliteration', activeLyricsLine.transliteration);
    setValue('english', activeLyricsLine.english);
  }, [activeLyricsLine, setValue]);

  const onSaveLyrics = ({ tibetan, transliteration, english }: LyricsLine): void => {
    if (activeLyricsLineIndex !== undefined) {
      const updatedLines = [...lyricsLines];
      updatedLines[activeLyricsLineIndex] = { tibetan, transliteration, english };
      setLyricsLines(updatedLines);
    } else {
      setLyricsLines([...lyricsLines, { tibetan, transliteration, english }]);
    }
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
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSaveLyrics)} className={styles.form}>
        {showTibetan && (
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
          Save
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
