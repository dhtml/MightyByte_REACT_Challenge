import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import YouTubeHeader from "../components/YouTubeHeader";
import Sidebar from "../components/Sidebar";
import FilterChips from "../components/FilterChips";
import VideoGrid from "../components/VideoGrid";

const queryClient = new QueryClient();

const Home = () => {
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
  const showSidebar = screenWidth > 768;

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <YouTubeHeader />
        <View style={styles.mainContent}>
          {showSidebar && <Sidebar />}
          <View style={styles.contentArea}>
            <FilterChips />
            <VideoGrid />
          </View>
        </View>
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 0,
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    minWidth: 0,
    overflow: 'hidden',
  },
});

export default Home;
