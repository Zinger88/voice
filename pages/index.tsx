import React from 'react';
import styles from '../styles/Home.module.css';
import { WelcomeScreen } from '../components/steps/WelcomeScreen';
import EnterFullNameScreen from '../components/steps/EnterFullNameScreen';
import { ChooseAvatarScreen } from '../components/steps/ChooseAvatarScreen';
import { SetPhoneNumberScreen } from '../components/steps/SetPhoneNumberScreen';
import { EnterActivateCodeScreen } from '../components/steps/EnterActivateCodeScreen';
import { Header } from '../components/Header';
import { EnterWithAuth } from '../components/steps/EnterWithAuth';

const stepsComponents = {
  0: WelcomeScreen,
  1: EnterWithAuth,
  2: EnterFullNameScreen,
  3: ChooseAvatarScreen,
  4: SetPhoneNumberScreen,
  5: EnterActivateCodeScreen
}

type MainContextProps = {
  step: number,
  user: null | object,
  onNextStep: (val: number) => void
  onSetUser: (val: object) => void
}

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {
  const [step, setStep] = React.useState<number>(0);
  const [user, setUser] = React.useState<object>({});
  const Step = stepsComponents[step];
  const onSetUser = (user: object) => {
    setUser(user);
  }

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <MainContext.Provider value={{step, user, onNextStep, onSetUser }}>
          <Step />
        </MainContext.Provider>
      </main>
    </div>
  )
}
