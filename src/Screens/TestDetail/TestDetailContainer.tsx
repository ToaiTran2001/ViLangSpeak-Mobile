import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { useLazyGetProgressTestQuery, useLazyGetTestDetailQuery } from "@/Services";
import { MainScreens, RootScreens } from "..";
import { TestDetail } from "./TestDetail";

type TestDetailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.TESTDETAIL
>;

export const TestDetailContainer = ({ navigation, route }: TestDetailScreenNavigatorProps) => {
  const [accountId, setAccountId] = useState(route.params.accountId);
  const [testId, setTestId] = useState(String(route.params.testId));

  // test = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const test = useLazyGetTestDetailQuery();

  const testProgress = useLazyGetProgressTestQuery();

  useEffect(() => {
    test[0](testId);
    testProgress[0]({test_id: testId, account_id: String(accountId)});
  }, [test[1].data, testProgress[1].data, testId, accountId]);

  const goBack = () => {
    navigation.goBack();
};

  return <TestDetail isLoading={test[1].isLoading} testProgress={testProgress[1].data?.data.progress.score.highest} accountId={accountId} test={test[1].data?.data.test} goBack={goBack} />;
};