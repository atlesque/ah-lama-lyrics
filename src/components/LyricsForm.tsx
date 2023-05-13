import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ObjectSchema, object, string } from 'yup';
import Button from './shared/Button';
import Input from './shared/Input';

import { LyricsLine } from '../types/lyrics';
import styles from './LyricsForm.module.scss';
import { useAtom } from 'jotai';
import { lyricsLinesAtom } from '../atoms/lyrics';

const LyricsForm = () => {
  const [lyricsLines, setLyricsLines] = useAtom(lyricsLinesAtom);

  const lyricsSchema: ObjectSchema<LyricsLine> = object({
    tibetan: string().required(),
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
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSaveLyrics = ({ tibetan, transliteration, english }: LyricsLine): void => {
    setLyricsLines([...lyricsLines, { tibetan, transliteration, english }]);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSaveLyrics)} className={styles.form}>
        <Input
          {...register('tibetan')}
          placeholder="Tibetan"
          error={errors.tibetan?.message}
          autoComplete="off"
        />
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
        <Button type="submit" color="success" isFullWidth>
          Save
        </Button>
      </form>
    </FormProvider>
  );
};

export default LyricsForm;
