import {AwsUploadModel} from "../../utils/util";
import {v4 as uuidv4} from "uuid";
import {ToBlob} from "../../utils/MetaverseModelFun/ExporterToZip";
import {size} from '../../Config'


export const getUploadSpaceUrl = async (file: File, content: any, nameSpace?: string) => {
	const name = file.name.split(".")[0];
	const result = content;
	const total = file.size / size; // 总的分为几片
	for (let idx: number = 0; idx <= total; idx++) {
		let end = size * (idx + 1);
		if (end >= file.size) {
			end = file.size;
		}
		const chunk = result.slice(size * idx, end);
		let blob = new Blob([chunk]);
		await ToBlob(blob, name + idx,nameSpace)
	}
	const mainFest = new File([JSON.stringify({
		total: Math.ceil(total),
		name,
		version: uuidv4()
	})], `${name}.json`, {
		type: "text/plain"
	});
	return await AwsUploadModel(mainFest);
}

