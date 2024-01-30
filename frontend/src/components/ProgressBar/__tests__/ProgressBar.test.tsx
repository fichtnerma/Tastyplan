import { render, fireEvent, prettyDOM, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

test('renders ProgressBar and checks step click', () => {
  const handleClick = jest.fn();

  const {container} =render(
    <ProgressBar 
      stepNames={['Step 1', 'Step 2', 'Step 3']} 
      activeStep={1} 
      stepIsDone={true} 
      onClick={handleClick} 
    />,
  );

  const stepElement = screen.getByTestId('Step 2'); 
  fireEvent.click(stepElement);

  expect(handleClick).toHaveBeenCalledWith('Step 2');
});
test.skip('renders ProgressBar and checks gradient style', () => {
  const handleClick = jest.fn();

  render(
    <ProgressBar 
      stepNames={['Step 1', 'Step 2', 'Step 3']} 
      activeStep={2} 
      stepIsDone={true} 
      onClick={handleClick} 
    />,
  );

  const progressBarElement = screen.getByTestId('progress-bar'); 
  
  if (progressBarElement) {
    console.log(prettyDOM(progressBarElement));
    const style = window.getComputedStyle(progressBarElement);
    const background = style.getPropertyValue('background');

    expect(background).toContain('33%');
  } else {
    throw new Error('Progress bar element not found');
  }
})
