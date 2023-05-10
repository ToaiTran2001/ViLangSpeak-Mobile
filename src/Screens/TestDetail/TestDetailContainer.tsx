import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { useLazyGetProgressTestQuery, useLazyGetTestDetailQuery } from "@/Services";
import { MainScreens, RootScreens } from "..";
import { TestDetail } from "./TestDetail";
import { CompositeScreenProps } from "@react-navigation/native";
import { MainBottomBarParamList } from "@/Navigation/Main";

type TestDetailScreenNavigatorProps = CompositeScreenProps<
	NativeStackScreenProps<RootStackParamList, RootScreens.TESTDETAIL>,
	NativeStackScreenProps<MainBottomBarParamList>
>;

interface SingleResult {
	isChoosed: boolean;
	isCorrect: boolean;
}
export interface Result {
	A: SingleResult;
	B: SingleResult;
	C: SingleResult;
	D: SingleResult;
}

export const TestDetailContainer = ({ navigation, route }: TestDetailScreenNavigatorProps) => {
	const [accountId, setAccountId] = useState(route.params.accountId);
	const [testId, setTestId] = useState(route.params.testId);

	// test = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
	const test = useLazyGetTestDetailQuery();

	const testProgress = useLazyGetProgressTestQuery();
	
	var dictResult: {[id: number]: Result;} = {};

	useEffect(() => {
		const accountIdString = String(accountId);
		const testIdString = String(testId);
		test[0](testIdString);
		testProgress[0]({test_id: testIdString, account_id: accountIdString});
	}, [testId, accountId]);

	const onNavigateTest = () => {
		navigation.navigate(MainScreens.TEST);
	};

  	return <TestDetail isLoading={test[1].isLoading} testProgress={testProgress[1].data?.data.progress.score.highest} accountId={accountId} test={test[1].data?.data.test} dictResult={dictResult} onNavigateTest={onNavigateTest} />;
};