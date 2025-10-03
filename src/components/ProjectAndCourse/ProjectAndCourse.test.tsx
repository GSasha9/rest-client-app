import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'next-intl';
import ProjectAndCourse from './ProjectAndCourse';

const messages = {
  project: 'Project',
  aboutProject: 'This is a project description.',
  course: 'Course',
  aboutCourse: 'This is a course description.',
};

describe('ProjectAndCourse', () => {
  it('renders project and course sections with correct text', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <ProjectAndCourse />
      </IntlProvider>
    );

    expect(screen.getByText(messages.project)).toBeInTheDocument();
    expect(screen.getByText(messages.course)).toBeInTheDocument();

    expect(screen.getByText(messages.aboutProject)).toBeInTheDocument();
    expect(screen.getByText(messages.aboutCourse)).toBeInTheDocument();
  });
});
