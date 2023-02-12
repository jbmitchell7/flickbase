import React, { useState } from "react";
import { View, StyleSheet, Linking, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button } from "react-native-paper";
import { setLoginStatus } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setId,
  setTotalPages,
  setWatchlist,
} from "../../redux/watchlist/watchlistSlice";
import { fetchPost, fetchGet, fetchDelete } from "../../api/tmdb";
import colors from "../../assets/colors";
import Snack from "../../ui/Snack";

const Login = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const [approvedToken, setApprovedToken] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackText, setSnackText] = useState("");

  const onToggleSnackBar = (result) => {
    setVisible(!visible);
    setSnackText(result);
  };

  const onDismissSnackBar = () => setVisible(false);

  const createRequest = async () => {
    try {
      const token = await fetchPost(`/4/auth/request_token`);
      Linking.openURL(
        `https://www.themoviedb.org/auth/access?request_token=${token.request_token}`
      );
      await AsyncStorage.setItem("token", token.request_token);
      setApprovedToken(true);
    } catch (error) {
      setSnackText("Error Requesting Token");
      onToggleSnackBar(snackText);
      throw new Error("error requesting token");
    }
  };

  const loginAccount = async () => {
    try {
      const asyncToken = await AsyncStorage.getItem("token");
      const response = await fetchPost(`/4/auth/access_token`, {
        request_token: asyncToken,
      });
      await AsyncStorage.setItem("userId", response.account_id);
      await AsyncStorage.setItem("token", response.access_token);
      dispatch(setLoginStatus(true));
      setUserWatchlist();
    } catch {
      setSnackText("Error Logging In");
      onToggleSnackBar(snackText);
      throw new Error("error logging in");
    }
  };

  const setUserWatchlist = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      const listRes = await fetchGet(`/4/account/${id}/lists`);
      let results = listRes.results;
      //searches for existing flickbase watchlist
      let fbListData = results.find(
        (list) => list.name === "Flickbase Watchlist"
      );
      //if it exists, set id in asyncstorage
      if (fbListData) {
        let listId = fbListData.id;
        dispatch(setId(listId.toString()));
        await AsyncStorage.setItem("watchlistId", listId.toString());
        const fbList = await fetchGet(
          `/4/list/${listId}?sort_by=release_date.desc`
        );
        dispatch(setTotalPages(fbList.total_pages));
        dispatch(setWatchlist(fbList.results));
      }
    } catch {
      throw new Error("watchlist not created");
    }
  };

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const logoutStatus = await fetchDelete(`/4/auth/access_token`, {
        access_token: token,
      });
      if (logoutStatus.success) {
        await AsyncStorage.setItem("token", "");
        await AsyncStorage.setItem("userId", "");
        await AsyncStorage.setItem("watchlistId", "");
        dispatch(setLoginStatus(false));
        dispatch(setWatchlist([]));
        dispatch(setTotalPages(0));
        setApprovedToken(false);
      }
    } catch (error) {
      setSnackText("Error Logging Out");
      onToggleSnackBar(snackText);
      throw new Error("error logging out");
    }
  };

  if (!loginStatus) {
    return (
      <View>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.text}>Step 1: Create an account at tmdb.org</Text>
        <Text style={styles.text}>
          Step 2: Approve access to your TMDB account
        </Text>
        <Text style={styles.text}>Step 3: Login</Text>
        <Button
          buttonColor={colors.yellow}
          mode="contained"
          style={styles.btn}
          icon="plus-circle"
          disabled={approvedToken}
          onPress={() => createRequest()}
        >
          Approve Access
        </Button>
        <Button
          buttonColor={colors.yellow}
          mode="contained"
          disabled={!approvedToken}
          icon="login"
          style={styles.btn}
          onPress={() => loginAccount()}
        >
          Login
        </Button>
        <Snack
          visible={visible}
          onDismissSnackBar={onDismissSnackBar}
          snackText={snackText}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.header}>Account</Text>
      <Button
        buttonColor={colors.yellow}
        mode="contained"
        icon="logout"
        style={styles.btn}
        onPress={() => logout()}
      >
        Logout
      </Button>
      <Snack
        visible={visible}
        onDismissSnackBar={onDismissSnackBar}
        snackText={snackText}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginVertical: 40,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  btn: {
    marginVertical: 20,
    padding: 1,
    alignSelf: "center",
  },
});

export default Login;
