import Entity from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Line extends Entity {
	get startPoint(): point3d_t {
		return this._startPoint;
	}
	get endPoint(): point3d_t {
		return this._endPoint;
	}

	private readonly _startPoint: point3d_t;
	private readonly _endPoint: point3d_t;

	public constructor(startPoint: point3d_t, endPoint: point3d_t) {
		super('LINE', 'AcDbLine');
		this._startPoint = startPoint;
		this._endPoint = endPoint;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.lineBBox(this.startPoint, this.endPoint);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.startPoint);
		manager.point3d(this.endPoint, 1);
		return manager;
	}
}
