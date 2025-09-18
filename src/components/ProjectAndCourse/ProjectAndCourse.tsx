import { useTranslations } from 'next-intl';
import s from './ProjectAndCourse.module.scss';

const ProjectAndCourse = () => {
  const t = useTranslations();

  return (
    <div className={s['text-main-wrapper']}>
      <div>
        <h3>{t('project')}</h3>
        <div className={s['text-main']}>{t('aboutProject')}</div>
      </div>
      <div>
        <h3>{t('course')}</h3>
        <div className={s['text-main']}>{t('aboutCourse')}</div>
      </div>
    </div>
  );
};

export default ProjectAndCourse;
