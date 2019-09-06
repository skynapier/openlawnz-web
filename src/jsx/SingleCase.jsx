import React, { Component } from "react";

import { Link } from "react-router-dom";
import ApiService from "../js/ApiService";

import "../scss/singleCase.scss";

class SingleCase extends Component {
	constructor({ match }) {
		super();
		this.state = {
			id: match.params.id,
			singleCase: null
		};
	}

	async fetchData(id) {
		let singleCase = await ApiService.getCase({ id: parseInt(id) });
		this.setState({ singleCase });
	}

	async componentDidMount() {
		this.fetchData(this.state.id);
	}

	async componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.fetchData(this.props.match.params.id);
		}
	}

	render() {
		if (!this.state.singleCase) {
			return <p>Loading</p>;
		}

		return (
			<React.Fragment>
				<h2 class="header">{this.state.singleCase.case_name}</h2>
				<br />
				<div class="two-column-grid">
					<div class="row">
						<div class="left-column" >
							<div class="segment">
								<iframe
									src={`https://docs.google.com/gview?url=https://s3-ap-southeast-2.amazonaws.com/openlaw-pdfs/${
										this.state.singleCase.PDF.bucket_key
									}&embedded=true`}
									style={{ width: 576, height: 478.12 }}
									frameBorder={0}
								/>
							</div>
						</div>
						<div class="right-column">
							<h3 class="header">Cites</h3>
							{this.state.singleCase.cites &&
								(this.state.singleCase.cites.length === 0 ? (
									<p>No cases</p>
								) : (
									<div role="listitem" class="item" >
										{this.state.singleCase.cites.map(function(obj) {
											return (
												<div role="listitem" class="item" key={`cites-reference-${obj.id}`}>
													<Link to={`/case/${obj.id}`}>{obj.case_name}</Link>
												</div>
											);
										})}
									</div>
								))}
							<hr></hr>	

							<h3 class="header">Cited By</h3>
							{this.state.singleCase.cited_by &&
								(this.state.singleCase.cited_by.length === 0 ? (
									<p>No cases</p>
								) : (
									<div role="listitem" class="item" >
										{this.state.singleCase.cited_by.map(function(obj) {
											return (
												<div role="listitem" class="item" key={`cited-by-reference-${obj.id}`}>
													<Link to={`/case/${obj.id}`}>{obj.case_name}</Link>
												</div>
											);
										})}
									</div>
								))}
							<hr></hr>	

							<h3 class="header">Legislation Referenced</h3>
							{this.state.singleCase.legislationReferences &&
								(this.state.singleCase.legislationReferences.length === 0 ? (
									<p>No legislation</p>
								) : (
									<table cellspacing="0" cellpadding="0">
										<thead class="">
											<tr class="">
												<th class="title">Title</th>
												<th class="section">Section</th>
											</tr>
										</thead>
										<tbody class="">
											{this.state.singleCase.legislationReferences.map(function(obj, i) {
												return (
													<tr class="" key={`legislation-reference-${i}`}>
														<td class="">{obj.legislation.title}</td>
														<td class="">{obj.section}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								))}
							<hr></hr>	
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default SingleCase;
