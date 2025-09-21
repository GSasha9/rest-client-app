import ComponentSlider from '@/components/ComponentSlider/ComponentSlider';
import Developers from '@/components/Developers/Developers';
import ProjectAndCourse from '@/components/ProjectAndCourse/ProjectAndCourse';

const MainContent = () => {
  return (
    <>
      <ComponentSlider
        slides={[
          <Developers key={crypto.randomUUID()} />,
          <ProjectAndCourse key={crypto.randomUUID()} />,
        ]}
      />
    </>
  );
};

export default MainContent;
