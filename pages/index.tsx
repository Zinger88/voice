import React from 'react';
import styles from '../styles/Home.module.css';
import { WelcomeScreen } from '../components/steps/WelcomeScreen';
import EnterFullNameScreen from '../components/steps/EnterFullNameScreen';
import { ChooseAvatarScreen } from '../components/steps/ChooseAvatarScreen';
import { SetPhoneNumberScreen } from '../components/steps/SetPhoneNumberScreen';
import { EnterActivateCodeScreen } from '../components/steps/EnterActivateCodeScreen';
import { Header } from '../components/Header';

const stepsComponents = {
  0: WelcomeScreen,
  1: EnterFullNameScreen,
  2: ChooseAvatarScreen,
  3: SetPhoneNumberScreen,
  4: EnterActivateCodeScreen
}

type MainContextProps = {
  onNextStep: (val: number) => void
  step: number
}

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {
  const [step, setStep] = React.useState<number>(0);
  const Step = stepsComponents[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <MainContext.Provider value={{step, onNextStep}}>
          <Step />
        </MainContext.Provider>
      </main>
    </div>
  )
}
