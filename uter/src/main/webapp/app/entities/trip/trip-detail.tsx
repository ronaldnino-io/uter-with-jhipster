import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TripDetail extends React.Component<ITripDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tripEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="uterApp.trip.detail.title">Trip</Translate> [<b>{tripEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">
                <Translate contentKey="uterApp.trip.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tripEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="uterApp.trip.driver">Driver</Translate>
            </dt>
            <dd>{tripEntity.driver ? tripEntity.driver.id : ''}</dd>
            <dt>
              <Translate contentKey="uterApp.trip.vehicle">Vehicle</Translate>
            </dt>
            <dd>{tripEntity.vehicle ? tripEntity.vehicle.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/trip" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/trip/${tripEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ trip }: IRootState) => ({
  tripEntity: trip.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetail);
