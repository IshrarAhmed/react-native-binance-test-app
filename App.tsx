import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

interface PriceData {
  symbol: string;
  price: string;
  time: Date;
  change?: number;
  lastUpdated?: Date;
}

const App = () => {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [lastUpdatedTime, setLastUpdatedTime] = useState<Date | null>(null);

  useEffect(() => {
    const symbols = [
      'btcusdt', 'ethusdt', 'bnbusdt',
      'solusdt', 'xrpusdt', 'adausdt',
      'dogeusdt', 'dotusdt', 'maticusdt'
    ];

    const ws = new WebSocket('wss://stream.binance.com:9443/ws');

    ws.onopen = () => {
      setConnectionStatus('Connected');
      setLoading(false);

      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: symbols.map(sym => `${sym}@ticker`),
        id: 1
      }));
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.e === '24hrTicker') {
        setLastUpdatedTime(new Date());

        setPrices(prevPrices => {
          const existingIndex = prevPrices.findIndex(item => item.symbol === data.s);
          const newPrice = parseFloat(data.c);
          let change = 0;

          if (existingIndex >= 0) {
            const oldPrice = parseFloat(prevPrices[existingIndex].price);
            change = ((newPrice - oldPrice) / oldPrice) * 100;
          }

          const newItem: PriceData = {
            symbol: data.s,
            price: data.c,
            time: new Date(),
            change: change,
            lastUpdated: new Date()
          };

          if (existingIndex >= 0) {
            const newPrices = [...prevPrices];
            newPrices[existingIndex] = newItem;
            return newPrices;
          } else {
            return [...prevPrices, newItem];
          }
        });
      }
    };

    ws.onerror = (e) => {
      console.log('WebSocket error:', e);
      setConnectionStatus('Connection error');
    };

    ws.onclose = (e) => {
      console.log('WebSocket closed:', e);
      setConnectionStatus('Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  const formatSymbol = (symbol: string) => {
    return symbol.replace('USDT', '/USDT').toUpperCase();
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderItem = ({ item }: { item: PriceData }) => {
    const isPositive = item.change && item.change >= 0;
    const priceColor = item.change ? (isPositive ? '#4CAF50' : '#F44336') : '#000';

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.symbolContainer}>
            <Text style={styles.symbol}>{formatSymbol(item.symbol)}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: priceColor }]}>
              ${parseFloat(item.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8
              })}
            </Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.time}>{formatTime(item.time)}</Text>
          {item.change !== undefined && (
            <Text style={[styles.change, { color: priceColor }]}>
              {isPositive ? '+' : ''}{item.change.toFixed(2)}%
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Price Tracker</Text>

        <View style={styles.statusRow}>
          <View style={styles.statusIndicatorWrapper}>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor:
                    connectionStatus === 'Connected'
                      ? '#4CAF50'
                      : connectionStatus === 'Connecting...'
                        ? '#FFC107'
                        : '#F44336',
                },
              ]}
            />
            <Text style={styles.statusText}>{connectionStatus}</Text>
          </View>

          {lastUpdatedTime && (
            <Text style={styles.updatedText}>
              Last Updated: {formatTime(lastUpdatedTime)}
            </Text>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Connecting to Binance WebSocket...</Text>
        </View>
      ) : (
        <FlatList
          data={prices}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 18,

  },
  statusRow: {
    marginTop: 8,
    alignItems: 'center',
  },
  statusIndicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  updatedText: {
    fontSize: 13,
    color: '#777',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  symbolContainer: {
    marginBottom: 8,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeContainer: {
    alignItems: 'flex-end',
  },
  change: {
    fontSize: 14,
  },
});

export default App;
