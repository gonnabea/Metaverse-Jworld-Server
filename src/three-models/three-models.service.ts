import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SaveThreeModelInput, SaveThreeModelOutput } from './dtos/saveThreeModel.dto';
import { ThreeModel } from './entities/threeModel.entity';

@Injectable()
export class ThreeModelsService {

    constructor(
        @InjectRepository(ThreeModel) private readonly threeModelRepository: Repository<ThreeModel>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,

    ) {}

    async save({installed, scale, rotateX, position, name, price, imageUrl, videoUrl, textContents}:SaveThreeModelInput, owner: User):Promise<SaveThreeModelOutput> {

        try {

            if(!owner) {
                return {
                    ok: false,
                    status: 400,
                    error: "유저를 찾을 수 없습니다."
                }
            }

            const model = this.threeModelRepository.create({
                installed,
                scale,
                rotateX,
                position,
                name,
                price,
                owner,
                miniHompi: owner.miniHompi,
                videoUrl,
                imageUrl,
                textContents
            });

            await this.threeModelRepository.save(model);
            
    
            if(model) {
                return {
                    ok: true,
                    status: 200
                }
            }

            return {
                ok: false,
                status: 400,
                error: "모델 저장 실패."
            }

        }
        catch(error) {
            return {
                ok: false,
                status: 400,
                error
            }
        }
        
    }

 }
