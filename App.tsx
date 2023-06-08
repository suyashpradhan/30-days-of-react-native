/** @format */

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
	Button,
	NativeEventEmitter,
	NativeSyntheticEvent,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';

interface TodoType {
	id: string;
	title: string;
	isCompleted: boolean;
}

export default function App() {
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState<TodoType[]>([]);

	const handleSubmit = () => {
		if (input.length > 0) {
			setTodos([...todos, { id: uuid.v4().toString(), title: input, isCompleted: false }]);
			setInput('');
		}
	};

	const deleteTodo = (deleteTodo: TodoType) => {
		const newTodoList = todos.filter((todo: TodoType) => todo.id !== deleteTodo?.id);
		setTodos(newTodoList);
	};

	const updateTodo = (updateTodo: TodoType) => {
		const updatedTodo = todos.map((todo: TodoType) => {
			if (todo.id === updateTodo.id) {
				return { ...todo, isCompleted: !todo.isCompleted };
			}
			return todo;
		});

		setTodos(updatedTodo);
	};

	console.log(todos, todos.length);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Todo App</Text>
				<StatusBar style='auto' />

				<View>
					<TextInput
						placeholder='Things to do...'
						style={styles.textInput}
						placeholderTextColor='#dadce0'
						onChangeText={(e: any) => setInput(e)}
					/>
					<Pressable style={styles.appButtonWrapper} onPress={handleSubmit}>
						<Text style={styles.appButton}>Add Todo</Text>
					</Pressable>
				</View>

				{todos.length > 0 ? (
					<View>
						<Text style={styles.todoListTitle}>My Todo List</Text>
						{todos.map((todo: TodoType) => {
							return (
								<View key={todo?.id} style={styles.todoListWrapper}>
									<Text
										style={[styles.todoTitle, todo.isCompleted && styles.completedTodo]}
										onPress={() => updateTodo(todo)}>
										{todo.title}
									</Text>
									<Pressable onPress={() => deleteTodo(todo)}>
										<Text style={styles.deleteTodoButton}>Delete</Text>
									</Pressable>
								</View>
							);
						})}
					</View>
				) : (
					<Text>No List</Text>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#303030',
		paddingHorizontal: 24,
	},
	title: {
		color: '#dadce0',
		fontSize: 36,
		paddingTop: 6,
	},
	textInput: {
		marginTop: 22,
		borderWidth: 1,
		borderColor: '#555',
		color: '#FFF',
		borderRadius: 4,
		paddingVertical: 8,
		paddingHorizontal: 8,
	},
	appButtonWrapper: {
		marginTop: 18,
	},
	appButton: {
		backgroundColor: '#256eff',
		textAlign: 'center',
		paddingVertical: 12,
		color: '#FFF',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#256eff',
	},
	todoListTitle: {
		color: '#dadce0',
		fontSize: 24,
		marginTop: 32,
		marginBottom: 22,
	},
	todoListWrapper: {
		marginBottom: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#777',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 8,
	},
	todoTitle: {
		color: '#dadce0',
		fontSize: 16,
		flex: 1,
	},
	deleteTodoButton: {
		backgroundColor: 'red',
		textAlign: 'center',
		paddingVertical: 8,
		paddingHorizontal: 12,
		color: '#FFF',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'red',
		width: 'auto',
	},
	completedTodo: {
		textDecorationLine: 'line-through',
		color: '#777',
	},
});
