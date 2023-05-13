import { FormProvider, useForm } from 'react-hook-form';
import Input from './shared/Input';
import Button from './shared/Button';
import { ObjectSchema, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './LyricsForm.module.scss';

interface LyricsValues {
  tibetan: string;
  transliteration: string;
  english: string;
}

const LyricsForm = () => {
  const lyricsSchema: ObjectSchema<LyricsValues> = object({
    tibetan: string().required(),
    transliteration: string().required(),
    english: string().required(),
  });

  const methods = useForm({
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

  const onSaveLyrics = ({ tibetan, transliteration, english }: LyricsValues): void => {
    // TODO: Implement
    console.log({ tibetan, transliteration, english });
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
