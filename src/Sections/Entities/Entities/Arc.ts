import Entity from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Arc extends Entity {
	private readonly _center: point3d_t;
	private readonly _radius: number;
	private readonly _startAngle: number;
	private readonly _endAngle: number;

	get endAngle(): number {
		return this._endAngle;
	}
	get startAngle(): number {
		return this._startAngle;
	}
	get radius(): number {
		return this._radius;
	}
	get center(): point3d_t {
		return this._center;
	}

	public constructor(
		center: point3d_t,
		radius: number,
		startAngle: number,
		endAngle: number
	) {
		super('ARC', 'AcDbCircle');
		this._center = center;
		this._radius = radius;
		this._startAngle = startAngle;
		this._endAngle = endAngle;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.center);
		manager.addTag(40, this.radius);
		manager.subclassMarker('AcDbArc');
		manager.addTag(50, this.startAngle);
		manager.addTag(51, this.endAngle);
		return manager;
	}
}
