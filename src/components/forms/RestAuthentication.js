import React from 'react';
import axios from "axios";

class RestAuthentication extends React.Component {
	state = {
		authentication: {},
		notification: {}
	}
	
	componentDidMount() {
		// authentication
		const userinfo = { 
			'username': 'testuser', 
			'password': 'testpassword222' 
		};
		axios.post(
				'https://gpew1dlmkg.execute-api.ap-southeast-2.amazonaws.com/prod/authenticate',
				userinfo,
				{ headers: {
					'Content-Type' : 'application/json'
				} 
			})
			.then(res => {
				console.log("MinhNguyen-RestAuthentication-authenticate");
				const authentication = res.data;
				// console.log(authentication);
				this.setState({ authentication:authentication });
			});
		// notification
		axios.get(
				'https://pecnupsocd.execute-api.ap-southeast-2.amazonaws.com/send/testnotification',
				{ headers: {
					'Content-Type' : 'application/json',
					'Authorization' : 'eyJraWQiOiJQZCtjOGtGSzZBSXRnb3RrU2w4dmtkcnIyS0o5eXdSdEVmVzVudmFGOGZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNmU3ODMyYi1lNTNhLTQyY2MtYTM3NS04MDM5ZWQxYjNhMjIiLCJhdWQiOiIzOG9jcTNvc2N0ZXQydnZ0N2gwM2RqamU5NSIsImV2ZW50X2lkIjoiZmM5YzA3ZDctNGNmYy00ODBkLWJjMWYtNmU3M2ZmMjNhNjU2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODY5NzQ3NTYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMl9JWnVoaHhTZnciLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdHVzZXIiLCJleHAiOjE1ODY5NzgzNTYsImlhdCI6MTU4Njk3NDc1Nn0.KkMbMgt3P7bRgI7f7T-xzvQy2wcmJT0XduDhZca3LcaR5cfPEMdxIH2zrpB0Pq265FSQFduz2EGO59wlRdXHKxmMkOttMbzuDcy-Vtnc0YG9sAk38m4LPQBiMwsreuUmwLHbxTf51bxkuqbi-oOITobsIkxjvYl0dHxWJyWpRV71Z_UYPRXtpFH_xcNbV085_9AUOfLV79lWIkIlie-LHKOfCrRJA8a9UOIyApClTVc0umBZE6wnamcwFUi7ZmvsO0JqomIWH7FZGqvFf8ofbU_rOe4j1GXCklR1QuUnl6Ma8UnYmXusI4fqKfI4w_2ih-lhEYlilBx-JmxUQg0ITQ'
				} 
			})
			.then(res => {
				console.log("MinhNguyen-RestAuthentication-testnotification");
				const notification = res;
        		this.setState({ notification:notification });
			});
	}
	
	render() {
		return (
			<div>
				<p>Status: {this.state.authentication.status}</p>
				<p>UserId: {this.state.authentication.user_id}</p>

				<p>Status: {this.state.notification.status}</p>
				<p>Message: {this.state.notification.message}</p>
			</div>
		)
	}
}

export default RestAuthentication;