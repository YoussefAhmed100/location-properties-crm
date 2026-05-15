export class UnitMapper {
  static toPublic(unit: any) {
    return {
      id: unit._id,

      type: unit.type,
      purpose: unit.purpose,

      price: unit.price,
      size: unit.size,

      bedrooms: unit.bedrooms,

      location: unit.location,
      floor: unit.floor,
      area: unit.area,
      images: unit.images,
      notes: unit.notes,
      project: unit.project?.name,
      
      status: unit.status,
    };
  }

  static toPublicList(units: any[]) {
    return units.map((unit) => this.toPublic(unit));
  }
}